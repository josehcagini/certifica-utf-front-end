
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

    const dsDate = date.getDate().toString().padStart( 2, '0' );
    const dsMonth = ( date.getMonth() + 1 ).toString().padStart( 2, '0' );

    return `${dsDate}/${dsMonth}/${date.getFullYear()}`;
}

const toDefaultFormatTime = ( date ) => {

    const dsHour = date.getHours().toString().padStart( 2, '0 ');
    const dsMinutes = date.getMinutes().toString().padStart( 2, '0 ');

    return `${toDefaultFormat(date)} ${dsHour}:${dsMinutes}`;
}

const fillHourAndMinutes = ( time, character = '0') => {
    const timeDecompose = time.split(":");
    return `${timeDecompose[0].padStart( 2, character )}:${timeDecompose[1].padStart( 2, character )}`
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
    fillHourAndMinutes: ( time, character = '0' ) => {
        return fillHourAndMinutes( time, character );
    }
}

export default DateHelper;
