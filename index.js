import axios from "axios"

console.log(/^[^\;\"\']+$/mi.test("Nathan"))
const params = {
    fullName: {
        sortBy: {
            type: "",
            value: "m"
        }
    }
}
const parsedParams = JSON.stringify(params)
const main = async () => {
    try {
        const res = await axios.get(`http://localhost:3001/get/subject?params=`+parsedParams, {
        id: 1,
        name: "Maths"
    })
    console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}
main()

//const date = new Date()
//console.log(date.toDateString())
//console.log(date.toISOString())
//console.log(date.toJSON())
//console.log(date.toUTCString())
//console.log(date.toString())
//console.log(date.toTimeString())