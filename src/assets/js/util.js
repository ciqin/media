export default {
    empty:( str ) =>{
        return typeof str == "undefined" || str == null || str == ""?true:false;
    },
    symbol:( str ) =>{
        let containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/)
        return ( containSpecial.test(str) );
    },
}