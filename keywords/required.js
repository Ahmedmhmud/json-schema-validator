
function required(keywordValue, instance){
    if(typeof keywordValue === "string"){
        return instance.hasOwnProperty(keywordValue);
    }else if(Array.isArray(keywordValue)){
        let isValid = true;
        let keywordArr = Array.from(keywordValue);
        for(const key of keywordArr){
            if(!instance.hasOwnProperty(key)){
                isValid = false;
                break;
            }
        }
        return isValid;
    }
}

module.exports = { required };