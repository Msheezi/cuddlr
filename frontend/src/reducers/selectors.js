export const getAge = (dob) => {
    let today = new Date()
    let birthday = new Date(dob)
    let age = today.getFullYear() - birthday.getFullYear()
    return age
}