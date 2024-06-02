export const initImages = (user, page = 1) => {
    let imagesFromDB = [];
    for (const item of user.famely.images) {
        const img = {
            url: item.url,
            metadata: {
                page: item.page,
                top: item.top,
                left: item.left,
                width: item.width,
                height: item.height,
                name: item.name,
                description: item.description,
                birthdate: item.birthdate,
            }
        }
        console.log(img);
        imagesFromDB.push(img);
    }
    return imagesFromDB;
}
