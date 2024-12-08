

export function handleInputChange(setState) {
    return function (event) {
      const { name, value } = event.target; // 입력 필드의 name과 value 추출
      console.log(value);
      setState(function (prev) {
        return {
          ...prev, 
          [name]: value, 
        };
      });
      
    };
  }
  


