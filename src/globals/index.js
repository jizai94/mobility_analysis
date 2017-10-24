export const ROOT_PATH = 'dataAnalyseIM'
export const HOME_PATH = 'home'
export const APP_PATH = 'applist'
export const HOME_MENU = ''
export const HOME_ITEM = ''

/*时间*/
const date = new Date()

const getBeforeDate = (n) => {
	let sum = n
    let d = new Date()
    let year = d.getFullYear()
    let mon=d.getMonth()+1
    let day=d.getDate()
    if(day <= sum){
        if(mon>1) {
            mon=mon-1
        }
        else {
            year = year-1
            mon = 12
        }
    }
    d.setDate(d.getDate()-sum)
    year = d.getFullYear()
    mon=d.getMonth()+1
    day=d.getDate()
   	let s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day)
    return s
}

const today = getBeforeDate(0)
const yesterday = getBeforeDate(1)
const lastWeek = getBeforeDate(7)
const lastWeekY = getBeforeDate(8)
const lMonthY = getBeforeDate(30)
const thrMonth = getBeforeDate(90)
const sixMonth = getBeforeDate(180)

const timeToString = (date) => {
	var arr = date.split("-");
	var datumStart = new Date(Date.UTC(arr[0],arr[1]-1,arr[2]-1,16,0,0));
	var datumEnd = new Date(Date.UTC(arr[0],arr[1]-1,arr[2],16,0,0));
	return {
		startTime: (datumStart.getTime()),
		endTime: (datumEnd.getTime())
	}
}

const durationToString = (preDate, date) => {
	var arr1 = preDate.split('-');
	var arr2 = date.split("-");
	var datumStart = new Date(Date.UTC(arr1[0],arr1[1]-1,arr1[2]-1, 16, 0, 0));
	var datumEnd = new Date(Date.UTC(arr2[0],arr2[1]-1,arr2[2], 16, 0, 0));
	return {
		startTime: (datumStart.getTime()),
		endTime: (datumEnd.getTime()),
		tranTime: (datumEnd-datumStart)/86400000
	}
}

const getTime = (date) => {
	var temp = new Date(parseInt(date));
	var month = temp.getMonth() + 1;
	month = month < 10 ? '0' + month : month;
	var day = temp.getDate();
	day = day < 10 ? '0' + day : day;
	return (month +'/'+ day);
}

const timeToMs = (date) => {
	return Date.parse(date)
}

export { today, yesterday, lastWeek, lastWeekY, lMonthY, timeToString, getTime, durationToString, timeToMs, thrMonth, sixMonth}
