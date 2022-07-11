import JSEncrypt1 from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0wJz44jaGCBWkjjt5eObfWs6rgc/xNCogla45A6DJDQPGsmYwiAEKh0eRqwp0SZNd5Mi7hMG1kBbQ3BqxmGOX1e26zRZETcPHuc3MvvbxUTJ2YwaneCARq8zhwGMJcV88qaxWfia5qQlR/wjpfczPQe6b6ZrpzoYq3MBZnevITpfl1b9veQzEtkd+TPf2vmDlWBLUSygZNl0CyqZvAJ5OQsHKsqkjZjA5xl8HAk75jlyvtsSMv3RribPQIMxaJSMgU1qSZHabq8yTiJoZw+aYBm/X4VoHpHxNhD7msLgONRlD2LBf/UBp439S4XKGkmVeZGQr1Up2vO8BqWFQrf6gwIDAQAB'

const privateKey = 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDTAnPjiNoYIFaSOO3l45t9azquBz/E0KiCVrjkDoMkNA8ayZjCIAQqHR5GrCnRJk13kyLuEwbWQFtDcGrGYY5fV7brNFkRNw8e5zcy+9vFRMnZjBqd4IBGrzOHAYwlxXzyprFZ+JrmpCVH/COl9zM9B7pvpmunOhircwFmd68hOl+XVv295DMS2R35M9/a+YOVYEtRLKBk2XQLKpm8Ank5CwcqyqSNmMDnGXwcCTvmOXK+2xIy/dGuJs9AgzFolIyBTWpJkdpurzJOImhnD5pgGb9fhWgekfE2EPuawuA41GUPYsF/9QGnjf1LhcoaSZV5kZCvVSna87wGpYVCt/qDAgMBAAECggEAOgC/mHlC8kTZZ0Js6rehQ12ZeMMXXWO6HnH2SwJOPEJvMH7gFeS1IFp2uxiSOiLcQpVYkbb7NyPjsmsRfszMVRsIdikinp/S8Ty/qK0g4V4iWkGwA1v2BvgcIu1i9/MMgKsfr0quUd4nPV1q8zE7jXg1YIGPsB1BMMfhR6h4pJomRHkC9WStF1F7LSgZvUywcShwhAptlhfuaa0a279Hv5deUfulx9vK5J+lvfTrP51gWHVE4EE1dqxs4qjbU0vX62HRLpmdkP/8dqioCIlTmXkS+fMwxT290n5i7yiVXHEYyg8M3opYb0vj1uF215qOf9n5KgHO7MiZqf/BYLIuEQKBgQD0EPsvsw7jtcMjrkC/XoV/dUijrhfHiXtf711GEs5OHL2pBGx9y/y1atUHCLaa25xtDr6CzsyRonFSx5h9ZOX1fg+gL0x5JxFsmAdqgSFD/Dfxm6LmatdzVxmbnlO9mzYm+NsMDjefgODlRjjw1Nw7JVtvtfoyx0Hml50mfdjKOwKBgQDdU7HUD8/jk/VNDyYECAHahQCCwRg0v35beoytGmp5Msurv22hPhk6Rje4OaOGneUj9VmaaUOoGIc82eunzjS39pyxTLE8AupcE5C+TdFnN9WiH+/wfoghEub7+tlzLIolUS26yxAsZfbt1VX5yJj2ibFN3WsJva+cTKqBWcZEWQKBgEB3x9G2q2Usmsnu+j1SW1LqiPBrSO60+vjBQlMDHql1YAeoGnw0CKFnAbQk8g7/mVcZQOtOcqy5StPB0x60KyXoUXpPZBTQZALaOYNBbqcFlUVlheb1K8nUpPf9H0ODHw+2Ri3uB3VDVqRZIytCHpYk7P0aBWeqSFb/j0wei8gHAoGAHOQvA3qo7ZFD5TJECSSucUMJZQgly8Tvjqt5r6MSIQ4TbjEH85NyoZvG7EKB6TG1VrNRZgm1rjy9cqET1Qzi7ty/aZmUTTwoMarQKzdnTW0JcyduH9u0k3SvOFdviUxYIDTvnkGhs9n/mN5PYdLgvNYOkhaEQXpEcUfEvivk6MkCgYEAmYlNkbFRuTzgOetyewXc0af9s6fXWybQzLn+SWjg9ZXjVRGa/4TSeRYYlKNl5sJvqO2rMrugYbL5sPWBORoIxZ+Gak8wp7LqjoDOC5O3wEOkD97A08WftNXPgkk1UW5aMdZ/2Jxk/LXYH4AFnerX02TLH4qGgPv9QXOrghf18iE='

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt1()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt1()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) // 对数据进行解密
}
