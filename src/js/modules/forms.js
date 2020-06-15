import {postDate} from '../services/requests'

const forms = () =>{
    const form = document.querySelectorAll('form'),
        input = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name="upload"]')

    //checkNumInputs('input[name="user_phone"]')


    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.git',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    }

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    }


    const clearInputs = () =>{
        inputs.forEach(item =>{
            item.value = ''
        })
        upload.forEach(item =>{
            item.previousElementSibling.textContent = 'Файл не выбран'
        })
    }

    upload.forEach(item =>{
        item.addEventListener('input', () =>{
            let dots
            const arr = item.files[0].name.split('.')

           arr[0].length > 6 ? dots = '...' : dots = '.'
            const name = arr[0].substring(0, 6) + dots + arr[1]
            item.previousElementSibling.textContent = name
        })
    })

    form.forEach(item =>{
        item.addEventListener('sumbit', (e) =>{
            e.preventDefault()

            let statusMessage = document.createElement('div')
            statusMessage.classList.add('status')
            item.parentNode.appendChild(statusMessage)

            item.classList.add('animated', 'fadeOutUp')
            setTimeout(() =>{
                item.style.display = 'none'
            }, 400)

            let statusImg = document.createElement('img')
            statusImg.setAttribute('src', message.spinner)
            statusImg.classList.add('animated', 'fadeInUp')
            statusMessage.appendChild(statusImg)

            let textMessage = document.createElement('div')
            textMessage.textContent = message.loading
            statusMessage.appendChild(textMessage)

            const formDate = new FormData(item)
            let api
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question

            postDate(api, formDate)
                .then(res =>{
                    statusImg.setAttribute('src', message.ok)
                    textMessage.textContent = message.success
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail)
                    statusMessage.textContent = message.failure
                })
                .finally(() =>{
                    clearInputs()
                    setTimeout(() =>{
                        statusMessage.remove()
                        item.style.display = 'block'
                        item.classList.remove('fadeOutUp')
                        item.classList.add('fadeInUp')
                    }, 5000)
                })
        })
    })
}

export default forms