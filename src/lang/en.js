export default {
  route: {
    ms: 'MS',
    dashboard: 'Dashboard',
    logoUpload: 'Logo Upload',
    avatarUpload: 'Avatar Upload',
    errorPages: 'Error Pages',
    page401: '401',
    page404: '404',
    errorLog: 'Error Log',
    i18n: 'I18n',
    goodsList: 'goodsList',
    customer: 'customer',
    customerList: 'customerList',
    customerEdit: 'customerEdit',
    user: 'user',
    changePwd: 'changePwd',
    userList: 'userList',
    permissionList: 'permissionList',
    assignPermissions: 'Allocation permissions',
    assignRole: 'Allocation roles'
  },
  navbar: {
    logOut: 'Log Out',
    dashboard: 'Dashboard',
    github: 'Github',
    screenfull: 'screenfull',
    changePwd: 'changePwd',
    headImg: 'Head portrait',
    theme: 'theme'
  },
  login: {
    title: 'Login Form',
    logIn: 'Log in',
    username: 'Username',
    password: 'Password',
    any: 'any',
    usernameerror: 'The username can not be empty',
    passworderror: 'The password can not be less than 6 digits'
  },
  permission: {
    roles: 'Your roles',
    switchRoles: 'Switch roles',
    type: 'type',
    module: 'module',
    name: 'name',
    depict: 'depict',
    extend: 'extend',
    createTime: 'createTime'
  },
  components: {
    documentation: 'Documentation',
    tinymceTips: 'Rich text editor is a core part of management system, but at the same time is a place with lots of problems. In the process of selecting rich texts, I also walked a lot of detours. The common rich text editors in the market are basically used, and the finally chose Tinymce. See documentation for more detailed rich text editor comparisons and introductions.',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    no: 'No',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    recovery: 'recovery',
    delete: 'Delete',
    noEnable: 'NoEnable',
    save: 'save',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  customer: {
    code: 'Phone',
    customerUser: 'CustomerUser',
    customerName: 'CustomerName',
    typeName: 'TypeName',
    sex: 'Sex',
    idCard: 'IdCard',
    bank: 'Bank',
    bankNo: 'BankNo',
    address: 'Address',
    createUserName: 'CreateUserName',
    lastCreateUserName: 'LastCreateUserName',
    createTime: 'CreateTime',
    lastCreateTime: 'LastCreateTime',
    remarks: 'Remarks'
  },
  user: {
    nickName: 'nickName',
    userName: 'userName',
    password: 'password',
    phone: 'phone',
    name: 'name',
    idCard: 'idCard',
    statusName: 'statusName',
    createTime: 'createTime',
    updateTime: 'updateTime0',
    changePwd: 'Change Password',
    resetPwd: 'Reset Password',
    oldPwd: 'Old Password',
    newPwd: 'New Password',
    save: 'save'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export selected items',
    placeholder: 'Please enter the file name(default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name(default file)'
  },
  theme: {
    change: 'Theme change',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  }
}
