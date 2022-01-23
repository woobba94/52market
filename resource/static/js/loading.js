    const gettoken = localStorage.getItem('token');
    const getname = localStorage.getItem('accountname');
    const getproimg = localStorage.getItem('profileImg');

    if(gettoken != null && getname != null && getproimg != null){
        location.href = './'
    }
    