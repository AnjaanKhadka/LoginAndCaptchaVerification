# Login And Captcha Verification
This Repo shows the implementation of 
- Password verification
  - Length of Password
    It checks for password length to be miminimum of 8 characters. This can be any alpha-nummeric characters along with 33 Special characters.
  - Inclusion of Lowercase, Uppercase, Special character and Nummeric character
    Password must contain UpperCase and LowerCase letters, atleast one nummeric character and one Special characters among 33 special characters.
    This special characters includes all characters from ascii value of 33d to 126d excluding alphabets in between.
- Captcha verification
  - Captcha generation
    Captcha generation is done by selecting eight random charcters from character set of 57 characters: abdefghijklmnopqrtuvwyABCDEFGHIJKLMNOPQRSTUVWXYZ123456789. Not all english alphabets are used. This is to avoid confusing letters. Letter z is removed to not confuse with Z. similarly letters c,s and x are removed. And number 0 is removed to avoid confusion with letter O.
    Old font generated by scanning old book is used. This font doesnot have clearly defined borders and have dirt marks all over the characters. This increases effort for someone who tries to implement ocr over captcha.
  - Random lines generation for reducing OCR detection.
    Random lines joins characters into segments. This makes some difficulty in characters segmentation.
  - Verifying captcha. 
