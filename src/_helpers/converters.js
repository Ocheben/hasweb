export const dateFormat = (date) => {
    var d = new Date(date);
    var day = d.getDate() < 10 ? '0'+d.getDate() : d.getDate();
    var months = [
        '01', '02', '03',
        '04', '05', '06',
        '07', '08', '09',
        '10', '11', '12'];
    var month = months[d.getMonth()];
    var year = d.getFullYear();
    var fullDate = day+'-'+month+'-'+year;
    return fullDate;
}

export const convertTime12to24 = (time12h) => {
    const [time, modifier] = String(time12h).split(' ');
  
    let [hours, minutes] = time.split(':');
  
    if (hours === '12') {
      hours = '00';
    }
  
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
  
    return hours + ':' + minutes + ':00';
  }

