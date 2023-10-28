import DateHelper from "@/helper/date/DateHelper";
import MessageHelper from "../message/MessageHelper";

const validateDateTimeMin = ( dsDateActual, dsDateBase ) => {

    if ( !dsDateActual ) {
      return MessageHelper.required;
    }

    if( !dsDateBase ){
        return true;
    }

    const dtBase = new Date( dsDateBase );
    const dtActual = new Date( dsDateActual );

    if ( DateHelper.isLargestOrEquals( new Date( dtBase ), new Date( dtActual ) ) ) {
        return MessageHelper.dateMin.replace( "%1", DateHelper.toDefaultFormatTime(dtBase) );
    }
    
    return true;

};

const validateDateInterval = ( dsMinDate, dsActualDate, dsMaxDate ) => {

    if ( !dsActualDate ) {
        return MessageHelper.required;
    }

    if( !dsMinDate || !dsActualDate ){
        return true;
    }
  
    const dtMin = new Date( DateHelper.toValidFormat( dsMinDate ) );
    const dtActual = new Date( DateHelper.toValidFormat( dsActualDate ) );
    const dtMax = new Date( DateHelper.toValidFormat( dsMaxDate ) );

    dtMin.setHours( 0, 0, 0, 0 );
    dtActual.setHours( 0, 0, 0, 0 );
    dtMax.setHours( 0, 0, 0, 0 );

    if ( DateHelper.isLargestDate( new Date( dtMin ), new Date( dtActual ) ) ) {
        return MessageHelper.dateMin.replace( "%1", DateHelper.toDefaultFormat(dtMin) );
    }

    if ( DateHelper.isLargestDate( new Date( dtActual ), new Date( dtMax ) ) ) {
        return MessageHelper.dateMax.replace( "%1", DateHelper.toDefaultFormat(dtMax) );
    }

    return true;
}

const validateHourMax = ( dsHourActual, dsHourBase ) => {

    if ( !dsHourActual ) {
        return MessageHelper.required;
    }

    if( !dsHourBase ){
        return true;
    }

    if( DateHelper.isTimeLowerFromString( dsHourBase, dsHourActual ) ){
        return MessageHelper.timeMax.replace( "%1", dsHourBase );
    }

    return true;
}

const validateHourMin = ( dsHourActual, dsHourBase ) => {

    if ( !dsHourActual ) {
        return MessageHelper.required;
    }

    if( !dsHourBase ){
        return true;
    }

    if( DateHelper.isTimeLowerFromString( dsHourActual, dsHourBase ) ){
        return MessageHelper.timeMin.replace( "%1", DateHelper.fillHourAndMinutes( dsHourBase ) );
    }

    return true;
}

const DateValidator = {
    validateDateTimeMin : ( dsDateActual, dsDateBase ) => {
        return validateDateTimeMin( dsDateActual, dsDateBase )
    },
    validateHourMin : ( dsHourActual, dsHourBase ) => {
        return validateHourMin( dsHourActual, dsHourBase )
    },
    validateDateInterval: ( dsMinDate, dsActualDate, dsMaxDate ) => {
        return validateDateInterval( dsMinDate, dsActualDate, dsMaxDate )
    },
    validateHourMax: ( dsHourActual, dsHourBase ) => {
        return validateHourMax( dsHourActual, dsHourBase )
    }
}

export default DateValidator;
