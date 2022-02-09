export function timeFormat(time){
	let date = new Date(time).toLocaleString('chinese', {hour12: false})
	return date
}