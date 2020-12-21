const mockdata = {
    signUpUser: {
      userName: "edmondo",
      email: "edmond@gmail.com",
      password: "Edmond@2020",
    },
    signUpInvalid: {
      name: "J",
      email: "edmond@gmail.com",
      password: "James@2020",
    },
    loginUser: {
      userName: "edmondo",
      email: "edmond@gmail.com",
      password: "Edmond@2020",
    },
    loginInvalidUser: {
      email: "edmon",
      password: "edmond@2020",
    },
    query: {
      senderName: "edmond",
      email: "edmond@gmail.com",
      messageBody: "test message"
    },
    article: {
      title: "blog title",
      description: "blog description",
      picURL: "https://via.placeholder.com/150",
      content: "This is a blog content",
    }
    
  };
  export default mockdata;