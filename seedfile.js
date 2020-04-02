const pics = {
  //userID: { [piclinks]}
};

const uploadPics = picObject => {
  let newPicEntry;
  for (key in picObject) {
    picObject[key].forEach(url => {
      newPicEntry = { userId: key, pictureUrl: url };
    });
  }
};
