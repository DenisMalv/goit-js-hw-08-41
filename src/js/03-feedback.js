import throttle from 'lodash/throttle';
const form = document.querySelector('.feedback-form')

const refs = {
    email: form.elements.email,
    message: form.elements.message,
    STORAGE_FORM_KEY:"feedback-form-state"
}
const { email, message, STORAGE_FORM_KEY } = refs

form.addEventListener('submit',onSubmitMessage)
form.addEventListener('input', throttle(onInputChange, 500))

const dataValue = {}
onLoadPage()

function onInputChange(event) {
    // <======== v3.0 form +, throttle +; =========
    dataValue[event.target.name]=event.target.value
    localStorage.setItem(STORAGE_FORM_KEY, JSON.stringify(dataValue))
    console.log(dataValue)
}

function onLoadPage() {
     const storageItem = JSON.parse(localStorage.getItem(STORAGE_FORM_KEY))
    if (storageItem ===null || storageItem ===undefined) {
        return
    }
    
    email.value = storageItem.email
    message.value = storageItem.message
    console.log(`localStorage при обн. стр. : ${localStorage.getItem(STORAGE_FORM_KEY)}`)
}

function onSubmitMessage(event) {
    event.preventDefault();
    console.log(`При сабмите формы :`, JSON.parse(localStorage.getItem(STORAGE_FORM_KEY)))
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
    