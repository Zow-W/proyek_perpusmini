let user = []
async function login() {
    try {
        let response = await fetch("data_user.json")
        user = await response.json()

    } catch(error) {
        console.log(error, "error");
    }
}

login()


