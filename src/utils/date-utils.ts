export class DateUtils {

    constructor() { }

    /**
     * Get formatted date (MM-DD-YYYY)
     * @param date 
     */
   public static getFormattedDate(format: string, date: Date): string {
        if (!format)
            format = "MM/dd/yyyy";

        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        format = format.replace("MM", month.toString().padStart(2, "0"));

        if (format.indexOf("yyyy") > -1)
            format = format.replace("yyyy", year.toString());
        else if (format.indexOf("yy") > -1)
            format = format.replace("yy", year.toString().substr(2, 2));

        format = format.replace("dd", date.getDate().toString().padStart(2, "0"));

        let hours = date.getHours();
        if (format.indexOf("t") > -1) {
            if (hours > 11)
                format = format.replace("t", "pm")
            else
                format = format.replace("t", "am")
        }
        if (format.indexOf("HH") > -1)
            format = format.replace("HH", hours.toString().padStart(2, "0"));
        if (format.indexOf("hh") > -1) {
            if (hours > 12) hours - 12;
            if (hours == 0) hours = 12;
            format = format.replace("hh", hours.toString().padStart(2, "0"));
        }
        if (format.indexOf("mm") > -1)
            format = format.replace("mm", date.getMinutes().toString().padStart(2, "0"));
        if (format.indexOf("ss") > -1)
            format = format.replace("ss", date.getSeconds().toString().padStart(2, "0"));
        return format;
    }

    /**
     * Add month to the date
     * @param after 
     * @param now 
     * @returns next month date
     */
     public static  addMonths(monthsToAdd: number, now: Date): Date {
        let current;
        if (now.getMonth() == 11) {
            current = new Date(now.getFullYear() + 1, 0, 1);
        } else {
            current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        }
        return current;
    }

    public static subtractMonths(monthsToSubtract: number, now: Date): Date {
        let current;
        if (now.getMonth() == 0) {
            current = new Date(now.getFullYear() - 1, 11, 1);
        } else {
            current = new Date(now);
            current.setMonth(current.getMonth() - monthsToSubtract);
        }

        return current;
    }
}
