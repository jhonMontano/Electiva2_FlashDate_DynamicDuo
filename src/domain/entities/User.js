class User{
    constructor(id, name, lastName, birthday,email, password, gender, prefereces, location, profilePhoto){
        this.id = id,
        this.name = name,
        this.lastName = lastName,
        this.birthday = birthday
        this.email = email,
        this.password = password,
        this.gender = gender,
        this.preferences = prefereces,
        this.location = location,
        this.profilePhoto = profilePhoto
    }
}

module.exports = User;