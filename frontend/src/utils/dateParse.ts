function dateParse(value: Date){
    const newValue = new Date(value);
    const year = newValue.getFullYear();
    const month = String(newValue.getMonth() + 1).padStart(2, '0');
    const day = String(newValue.getDate()).padStart(2, '0');
    return year + "-" + month + "-" + day;
}
export default dateParse;