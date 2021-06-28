function getUsers() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {name: 'Pedro', lang: 'Javascript'},
                {name: 'Maxel', lang: 'C#'},
                {name: 'Casalli', lang: 'Python'}
            ]);
        }, 2000);
    });
}

async function main() {
    console.time('async')

    const users = await getUsers()
    console.log(users);

    console.timeEnd('async')
}

main()