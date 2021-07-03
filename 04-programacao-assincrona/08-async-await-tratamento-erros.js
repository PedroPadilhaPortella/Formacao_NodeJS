function pegarId(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(5) 
        }, 1500)
    })
}

function buscarEmailNoBanco(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("victorlima@guia.com.br")
        }, 2000);
    })
}

function enviarEmail(corpo, para){
    return new Promise((resolve, reject) => {
        setTimeout(() => {  
            var deuErro = false;
            if(!deuErro){
                resolve({time: 6, to: "victor@udemy.com"}) // Promessa OK!
            }else{
                reject("Fila cheia") // Foi mal, eu falhei :(
            }
        }, 4000)
    });
}


async function main() {
    try {
        const id = await pegarId();
        const email = await buscarEmailNoBanco(id);
        await enviarEmail("Olá, como vai?", email);
        console.log("Email enviado, para o usuário com id: " + id);   
        console.timeEnd('Promise');
    } catch(err) {
        console.error('Ocorreu um erro');
    }
}

console.time('Promise');
main();