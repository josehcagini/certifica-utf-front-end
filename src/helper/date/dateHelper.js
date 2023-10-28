
const isTimeLowerFromString = ( first, second ) => {

    const hourActual = first.split( ":" );
    const hourBase = second.split( ":" );

    const indexHour = 0;
    const indexMinuts = 1;

    if( parseInt( hourActual[indexHour] ) < parseInt( hourBase[indexHour] ) ){
        return true;
    }

    if( parseInt( hourActual[indexHour] ) > parseInt( hourBase[indexHour] ) ){
        return false;
    }

    if( parseInt( hourActual[indexMinuts] ) <= parseInt( hourBase[indexMinuts] ) ) {
        return true;
    }
}

const toValidFormat = ( dsDate ) => {
    return dsDate.replace(/-/g, '\/').replace(/T.+/, '')
}

const isEqualsDateFromString = ( first, second ) => {

    let dtFirst = new Date( toValidFormat( first ) );
    let dtSecond = new Date( toValidFormat( second ) );
    
    dtFirst.setHours(  0, 0, 0, 0 );
    dtSecond.setHours( 0, 0, 0, 0 );

    return dtFirst.getTime() === dtSecond.getTime();
}

const toDefaultFormat = ( date ) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

const toDefaultFormatTime = ( date ) => {
    return `${toDefaultFormat(date)} ${date.getHours()}:${date.getMinutes()}`;
}

const DateHelper = {

    toDefaultFormat: ( date ) => {
        return toDefaultFormat( date );
    },
    toDefaultFormatTime: ( date ) => {
        return toDefaultFormatTime( date );
    },
    isLargestDate: ( first, second ) => {
        return first.getTime() > second.getTime();
    },
    isLargestOrEquals: ( first, second ) => {
        return first.getTime() >= second.getTime(); 
    },
    toValidFormat: ( dsDate ) => {
        return toValidFormat( dsDate );
    },
    isEqualsDateFromString: ( first, second ) => {
        return isEqualsDateFromString( first, second );
    },
    timeFromDateTimeAsString: ( date ) => {
        return `${date.getHours()}:${date.getMinutes()}`
    },
    isTimeLowerFromString: ( first, second ) => {
        return isTimeLowerFromString( first, second );
    },
}

export default DateHelper;