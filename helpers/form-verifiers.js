export  const verifiers = [
    verifyFormStep_1,
    verifyFormStep_2,
    verifyFormStep_3,
    verifyFormStep_4,
    verifyFormStep_5,
    verifyFormStep_6
]
function verifyFormStep_1(data){
    let msg = ""
    let success = true;

    if (data['appName'].current.value == ""){
        return ["Please enter an app name", false];
    }
    /* compare if url is valid */
    if (data['url'].current.value == "" || !validateUrl(data['url'].current.value)){
        console.log("ghere")
        console.log(validateUrl(data['url'].current.value))
        return ["Please enter a valid url", false];
    }
    if (data['platform']['android'] == false && data['platform']['ios'] == false){
        return ["Please select at least one platform", false];
    }
    if (data['icon'].current.value == ""){
        return ["Please enter an icon", false];
    }
    
    return [msg, success];
}
function verifyFormStep_2(data){
    let msg = "badd"
    let success = true;
    if(data['package_name'].current.value == ""){
        return ["Please enter a package name", false];
    }
    let pattern="^([A-Za-z]{1}[A-Za-z\d_]*\.)+[A-Za-z][A-Za-z\d_]*$"
    if(!data['package_name'].current.value.match(pattern)){
        return ["Please enter a valid package name", false];
    }
    if (data['package_name'].current.value.indexOf("package") != -1){
        return ["Package Name can not contain the word 'package'", false];
    }
    return [msg, success];
}
function verifyFormStep_3(data){
    let msg = ""
    let success = true;
    console.log(data);
    return ["", true];
}
function verifyFormStep_4(data){
    let msg = ""
    let success = true;
    console.log(data['banner_id'].current.value);
    if (data['admob'].current.checked || data['pushNoti'].current.checked){
        if (data['admob_id'].current.value == ""){
            return ["Please enter an AdMob ID", false];
        }
        if (data['banner_id'].current.value == ""){
            return ["Please enter a Banner ID", false];
        }

        if(data['GSFile'].current.value == ""){
            return ["Please upload a Google Service File", false];
        }
    }
    console.log(data['admob'].current.checked)
    return ["", true];
}
function verifyFormStep_5(data){
    let msg = ""
    let success = true;
    return [msg, success];
}
function verifyFormStep_6(data){
    let msg = ""
    let success = true;
    if (data['keystore_setting'] == "new"){
        if (data['Name'].current.value == ""){
            return ["Please enter Your name", false];
        }
        if (data['Organization'].current.value == ""){
            return ["Please enter Your organization", false];
        }
        if (data['keyAlias'].current.value == ""){
            return ["Please enter Your alias", false];
        }
        if (data['keystorePassword'].current.value == ""){
            return ["Please enter Your keystore password", false];
        }
        if (data['keystorePassword'].current.value.length < 6){
            return ["Your keystore password must be at least 6 characters", false];
        }

    }
    if (data['keystore_setting'] == "have"){
        if (data['keystore'].current.value == ""){
            return ["Please enter Your keystore", false];
        }
        if (data['keystorePassword2'].current.value == ""){
            console.log(data['keystorePassword2'].current.value);
            return ["Please enter Your keystore password", false];
        }
    }
    if (data['platform']['ios'] == true){
        if (data['certificate'].current.value == ""){
            return ["Please enter Your certificate", false];
        }
        if (data['provisioningProfile'].current.value == ""){
            return ["Please enter Your provisioning profile", false];
        }
        if (data['keyPassword'].current.value == ""){
            return ["Please enter Your key password for iOS", false];
        }
    }
    return [msg, success];
}

function validateUrl(url) {
    try {
        url = new URL(url);
      } catch (_) {
        console.log(_)
        return false;  
      }
      return true;
}
  