

export function getNormalizedString(text){

    text = text.replace('.',"");
    text = text.replace('\'',"");
    text = text.replace(' ',"");

    return text;
}