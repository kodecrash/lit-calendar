import { LitElement, html, customElement, property } from "lit-element";
import { styles } from './lit-calendar-style';
import { DateUtils } from '../utils/date-utils';

const DateConstants = {
  months : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days :  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
}

const inputConverter = (value, type: any) => {
  if (type.name === 'String') {
    return JSON.parse(value);
  } else  {
    return value;
  }
}

const SPACEBAR_KEY_CODE = 32;
const ENTER_KEY_CODE = 13;
const DOWN_ARROW_KEY_CODE = 40;
const UP_ARROW_KEY_CODE = 38;
const ESCAPE_KEY_CODE = 27;

@customElement('lit-calendar')
export class LitCalendar extends LitElement {
  
  static styles = styles;

  //Attributes
  // Input Date 'MM-dd-yyyy'
  @property({ type: String, attribute: true, reflect: true })
  date;

  @property({ type: String, attribute: 'display-years', converter: inputConverter }) 
  displayYears;

  @property({ type: String, attribute: true, converter: inputConverter,  }) 
  config;

  @property({ type: Boolean}) toggleYears:boolean = false;

  // Class Variables
  monthCounter:number;
  // current date
  currentDate:Date; 
  currentYear:number; 

  monthsArr:Array<String>;

  daysArr:Array<String>;

  nextDisabled: boolean = false;

  prevDisabled: boolean = false;

  formattedMonth!: String;

  refYear!: number; // Reference year (first item from the displayYears input property)
  
  selectedYear;

  @property({})
  defaultConfig: any = {
    disabled: false,
    theme: 'primary', // 'orange' , 'dark'
    allowFutureMonths: true // true/false
  };

  constructor() {
    super();
    this.monthsArr = DateConstants.months;
    this.daysArr = DateConstants.days;
    this.monthCounter = 0;
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.date) {
      throw new Error('Please provide date')
    }

    this.currentDate = new Date(this.date);
    this.currentYear = this.currentDate.getFullYear();
    console.log('Current date: ' + this.currentDate);
    if (this.displayYears) {
      this.selectedYear = this.currentYear;
      // refYear is the year after that there are no years to be shown in the calendar
      this.refYear = this.displayYears[0];

      if (this.displayYears.indexOf(this.currentYear) == -1) {
        throw new Error('Input date should be within display years')
      }
    }
    // Show formatted month in the month title
    this.formattedMonth = this.monthsArr[this.currentDate.getMonth()]
    this.monthCounter = this.currentDate.getMonth();

    // Override defaultConfig with input config
    this.config = Object.assign(this.defaultConfig, this.config);

    // Disable next button if @Input date is passed as today's date
    if (this.config.allowFutureMonths == false) {
        this.updateNextButtonState(new Date(), this.currentDate)
    }
  }

  showPrevMonth() {
    this.monthCounter--;
    // Enable next button if already disabled
    this.nextDisabled = false;

    if (this.monthCounter >= 0 ) {
      this.formattedMonth = this.monthsArr[this.monthCounter];
      if (this.monthCounter != 0) {
       this.currentDate = DateUtils.subtractMonths(1,  this.currentDate);
      }
     
      if (this.monthCounter == 0) {
        this.currentDate = new Date(`${this.monthCounter + 1}-01-${this.selectedYear}`);
        if (this.refYear == this.selectedYear) {
          this.prevDisabled = true;
        }
      }
     
    } else {
      if (this.refYear != this.selectedYear) {
        this.monthCounter = this.monthsArr.length - 1;
        this.selectedYear = this.selectedYear - 1;
        this.formattedMonth = this.monthsArr[this.monthCounter];
        if (this.monthCounter == this.monthsArr.length - 1) {
          this.currentDate = new Date(`${this.monthCounter + 1}-01-${this.selectedYear}`);
        } else {
          this.currentDate = new Date(`${this.monthCounter}-01-${this.selectedYear}`);
        }
       
      }
    }
    console.log('Current Date Prev', this.currentDate)
    this.onCalendarChanged();
  }

  showNextMonth() {
    // Increment month counter index
    this.monthCounter++;
    // Enable previous button if already disabled
    this.prevDisabled = false;

    // Check if month counter is less that monthsArr length i.e. 12
    if (this.monthCounter < this.monthsArr.length) {
      this.formattedMonth = this.monthsArr[this.monthCounter];
      this.currentDate = DateUtils.addMonths(1,  this.currentDate);
     
    } else {
      this.monthCounter = 0;
      this.selectedYear = this.selectedYear + 1;
      this.formattedMonth = this.monthsArr[this.monthCounter];
      this.currentDate = new Date(`${this.monthCounter + 1}-01-${this.selectedYear}`);
    }

  
    if (this.config.allowFutureMonths == false) {
      this.updateNextButtonState(new Date(), this.currentDate)
    }
    console.log('Current Date next', this.currentDate)
    this.onCalendarChanged();
  }

  showYears() {
    this.toggleYears = !this.toggleYears;
  }

  selectYear(year: number) {
    this.selectedYear = year;
    this.toggleYears = !this.toggleYears;
    this.currentDate = new Date(`${ this.currentDate.getMonth() + 1}-01-${this.selectedYear}`);
    // Disable next button if @Input date is passed as today's date
    if (this.config.allowFutureMonths == false) {
      this.updateNextButtonState(new Date(), this.currentDate)
    }

    if (this.refYear != this.selectedYear && this.monthCounter > 0) {
      this.prevDisabled = false;
    } else if (this.refYear == this.selectedYear && this.monthCounter == 0) {
      this.prevDisabled = true;
    }
    console.log('Current Date ', this.currentDate)
    this.onCalendarChanged();
  }

  /**
   * Keyboard accessibility
   */
  selectYearKeyPress(year: number, e) {
    switch (e.keyCode) {
      case ENTER_KEY_CODE:
        this.selectYear(year);
        break;

      case DOWN_ARROW_KEY_CODE:
          
        break;

      case UP_ARROW_KEY_CODE:
        
        break;

      case ESCAPE_KEY_CODE:
        this.toggleYears = !this.toggleYears;   
        break;

      case SPACEBAR_KEY_CODE: 
        this.selectYear(year);
        break;

      default:
        return;
    }
  }

  /**
   * Keyboard accessibility
   */
  showPrevMonthKeyPress(e:any) {
    switch (e.keyCode) {
      case ENTER_KEY_CODE:
        this.showPrevMonth();
        break;
      case SPACEBAR_KEY_CODE: 
        this.showPrevMonth();
        break;
      default:
        return;
    }
  }

  /**
   * Keyboard accessibility
   */
  showNextMonthKeyPress(e:any) {
    switch (e.keyCode) {
      case ENTER_KEY_CODE:
        this.showNextMonth();
        break;
      case SPACEBAR_KEY_CODE: 
        this.showNextMonth();
        break;
      default:
        return;
    }
  }

   /**
   * 
   * @param dateToCompare start date to compare
   * @param selectedDate (selected date or today's date)
   */
  updateNextButtonState(dateToCompare:Date , selectedDate: Date) {
    if (selectedDate.getFullYear() == dateToCompare.getFullYear() 
    && selectedDate.getMonth() == dateToCompare.getMonth()) {
        this.nextDisabled = true;
    } else {
      this.nextDisabled = false;
    }
  }

   

  onCalendarChanged() {
    const event = new CustomEvent('date-changed', {
      detail: {
        date: this.currentDate
      }
    });
    this.date = DateUtils.getFormattedDate('MM-dd-yyyy',  this.currentDate);
    this.dispatchEvent(event);
  }

 
  render() {
   
    return html`
        <div class="icon ${this.config.theme}">
        <div class="month">
            <span class="prev" @click=${this.showPrevMonth.bind(this)} 
                               @keypress=${this.showPrevMonthKeyPress.bind(this)} 
                               tabindex="0" 
                               disabled=${this.prevDisabled}
                               aria-label="previous month" 
                               role="presentation">
            </span>
            <span class="month-title" tabindex="1">${this.formattedMonth}</span>
            <span class="next" @click=${this.showNextMonth.bind(this)} 
                               @keypress=${this.showNextMonthKeyPress.bind(this)} 
                               tabindex="2" 
                               disabled=${this.nextDisabled}
                               aria-label="next month" 
                               role="presentation">
            </span>
        </div>
    
        <div class="year">
            <div class="md-select ${this.toggleYears? 'active':''}">
                <label for="ul-id">
                 <button type="button" aria-label="select year"
                        tabindex="3" @click=${this.showYears}>${this.selectedYear}</button></label>
                <ul role="listbox" id="ul-id" class="md-whiteframe-z1"  name="ul-id" >
                  ${this.displayYears.map( (year, index) => html`<li tabindex="${(index + 3)}" @click=${this.selectYear.bind(this, year)} @keypress=${this.selectYearKeyPress.bind(this, year)}>${year}</li>`)}   
                </ul>
            </div>
        </div>
    </div>
        `;
  }

}