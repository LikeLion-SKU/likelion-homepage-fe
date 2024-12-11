
// input창 onChange()에서 setForm() 해주는 함수 //
export function handleInputChange(setState) {
    return function (event) {
      const { name, value } = event.target; // 입력 필드의 name과 value 추출
   
      setState(function (prev) {
        return {
          ...prev, 
          [name]: value, 
        };
      });
      
    };
  }
  

