// convert created_at to new Date for converting to a time as a string
export type firestoreDate = {seconds: number; nanoseconds: number};
export const convertMessageDate = (messageDate: firestoreDate): string => {
    let rawDate = new Date(messageDate.seconds * 1000 + messageDate.nanoseconds / 1000000);
    if (createFullDate(new Date()) === createFullDate(rawDate)) {
        return rawDate.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    } else {
        return rawDate.toLocaleDateString([], {
            month: "short",
            day: "numeric",
        });
    }
}

// convert dates to use in conditional statement
const createFullDate = (date: Date): string => {
    const month = date.getMonth() + 1; //months from 1-12
    const day = date.getDay();
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};