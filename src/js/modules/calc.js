const calc = (size, material, options, promocod, result) =>{
    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionBlock = document.querySelector(option),
          promocodBlock = document.querySelector(promocod),
          resultBlock = document.querySelector(result)

    let sum = 0

    const calcFunc = () =>{
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionBlock))

        if(sizeBlock.value == '' || materialBlock.value == ''){
            resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины'
        }else if(promocodBlock.value === 'IWANTPOPART'){
            resultBlock.textContent = Math.round(sum * 0.7)
        }else{
            resultBlock.textContent = sum
        }

    }

    sizeBlock.addEventListener('chang', calcFunc())
    materialBlock.addEventListener('chang', calcFunc())
    optionBlock.addEventListener('chang', calcFunc())
    promocodBlock.addEventListener('input', calcFunc())



}