
class DateHelper {

    static toDefaultFormat( date ){
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    static toDefaultFormatTime( date ) {
        return `${this.toDefaultFormat(date)} ${date.getHours()}:${date.getMinutes()}`
    }

    static isLargestDate( first, second ){
        return first.getTime() > second.getTime();
    }

    static isLargestOrEquals( first, second ){
        return first.getTime() >= second.getTime(); 
    }

    static toValidFormat( dsDate ){
        return dsDate.replace(/-/g, '\/').replace(/T.+/, '');
    }

    static isEqualsDateFromString( first, second ){

        let dtFirst = new Date( this.toValidFormat( first ) );
        let dtSecond = new Date( this.toValidFormat( second ) );
        
        dtFirst.setHours(  0, 0, 0, 0 );
        dtSecond.setHours( 0, 0, 0, 0 );

        return dtFirst.getTime() === dtSecond.getTime();
    }

    static timeFromDateTimeAsString( date ){
        return `${date.getHours()}:${date.getMinutes()}`
    }

    static isTimeLowerFromString( first, second ) {

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
    
}

export default DateHelper;