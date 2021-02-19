
const sleep = (second) => {
    return new Promise((resolve) => setTimeout(resolve, second))
}

const test = async () => {
    console.log('start')
    await sleep(1000)
    console.log('end')
}

test()