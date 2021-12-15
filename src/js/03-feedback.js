import throttle from 'lodash/throttle';
const form = document.querySelector('.feedback-form')

const refs = {
    email: form.elements.email,
    message: form.elements.message,
    STORAGE_FORM_KEY: "feedback-form-state",
}
const { email, message, STORAGE_FORM_KEY} = refs
let dataValue = {}
onLoadPage()

form.addEventListener('submit',onSubmitMessage)
form.addEventListener('input', throttle(onInputChange, 500))




function onInputChange(event) {
    // <======== v3.0 form +, throttle +; =========
    dataValue[event.target.name] = event.target.value
    localStorage.setItem(STORAGE_FORM_KEY, JSON.stringify(dataValue))
    // console.log(dataValue)
}

function onLoadPage() {
    const storageItem = JSON.parse(localStorage.getItem(STORAGE_FORM_KEY)) 
    if (storageItem === null || storageItem ===undefined) {
        return
      }
    dataValue = storageItem

    console.log('storageItem.email :',storageItem.email)
    console.log('storageItem.message :', storageItem.message)
    email.value = storageItem.email ? storageItem.email : email.value
    message.value = storageItem.message ? storageItem.message : message.value

    console.log(`LOCALE_STORAGE при обн. стр. :`, JSON.parse(localStorage.getItem(STORAGE_FORM_KEY)))
}

function onSubmitMessage(event) {
    event.preventDefault();
    console.log(`LOCALE_STORRAGE При сабмите формы :`, JSON.parse(localStorage.getItem(STORAGE_FORM_KEY)))
    // dataValue = {}
    localStorage.removeItem(STORAGE_FORM_KEY)
    form.reset()
}

    // <======== v1.0 form +, throttle -; =========
    // const formData = new FormData(event.currentTarget)
    // formData.forEach((value, name) => dataValue[name] = value)
    // localStorage.setItem(STORAGE_FORM_KEY, JSON.stringify(dataValue))
    // console.log(dataValue)
    
    // <======== v2.0 form -, throttle +; =========
    // const dataValue = {email:email.value,message:message.value}
    // localStorage.setItem(STORAGE_FORM_KEY, JSON.stringify(dataValue))
    // console.log(dataValue)    
    