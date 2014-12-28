
var calculator = {
    display : document.getElementById("calculator").getElementsByClassName("display")[0],
    formula : document.getElementById("calculator").getElementsByClassName("formula")[0],
    minus_sign_switch : false,
    error_switch: false,
    operator_applied: false,
    equals_applied: false,
    last_operator: '',
    input_number: 0,

    memory_sign : document.getElementById("calculator").getElementsByClassName("memory_sign")[0],
    error_sign: document.getElementById("calculator").getElementsByClassName("error_sign")[0],
    
    memory: 0,
    computation: 0,
    
    
    clearEntry: function(){
        if(!this.error_switch){
            this.display.innerHTML = "0";
            this.minus_sign_switch = false;
        }
    },
    
    
    clear: function(){
        this.display.innerHTML = "0";
        this.error_sign.innerHTML = "&nbsp;";
        this.formula.innerHTML = "&nbsp;";
        this.computation = 0;
        this.operator_applied = false;
        this.equals_applied = false;
        this.error_switch = false;
        this.minus_sign_switch = false;
    },
    

    
    apply_operator: function(num1,num2,operator){
        switch(operator){
            case '+':
                return num1+num2;
            case '-':
                return num1-num2;
            case '*':
                return num1*num2;
            case '/':
                if(num2===0){
                    this.error();
                    return 0;
                }
                return num1/num2;
            default:
                return 0;
        
        }
    },
    
    error: function(){
        this.error_sign.innerHTML = "E";
        this.error_switch = true;
    },
    
    display_result: function(){
        this.display.innerHTML = this.computation.toString();
        this.update_minus_sign_switch();
    },
    
    update_formula: function(operator){
        this.formula.innerHTML += this.display.innerHTML + " " + operator + " ";
        if(this.formula.innerHTML.length > 25){
            var length = this.formula.innerHTML.length;
            this.formula.innerHTML = this.formula.innerHTML.substr(length-25,25);
        }
    },
    
    change_last_operator_on_fornula: function(operator){
        this.formula.innerHTML = this.formula.innerHTML.substr(0,this.formula.innerHTML.length-3)+ " " + operator + " ";

    },
    
    clear_formula: function(){
        this.formula.innerHTML = "&nbsp;";
    },
    
    record_last_opratator: function(operator){
        this.last_operator = operator;
    },
    
    get_input_number: function(){
        this.input_number = parseFloat(this.display.innerHTML);
    },
    
    equals: function(){
        if(!this.equals_applied){
            this.get_input_number();
            this.clear_formula();
            this.equals_applied = true;
        }
        
        this.compute();
        this.display_result();
        
    },
    
    root: function(){
        var input = parseFloat(this.display.innerHTML);
        if(input<0){
            this.error();
            input = 0;
        }
        
        
        
        this.display.innerHTML = Math.sqrt(input).toString();
        
        if(this.display.innerHTML.length >12){
            this.display.innerHTML = this.display.innerHTML.substr(0,12);
        }
        
    },
    
    compute: function(){
        
        if(this.last_operator === ''){
            this.computation = this.input_number;
        }else{
            this.computation = this.apply_operator(this.computation,this.input_number,this.last_operator);
        }
    },
    
    
    
    add_operator: function(operator){
        if(this.operator_applied){
            this.change_last_operator_on_fornula(operator);
            this.record_last_opratator(operator);
            return;
        }
        
        this.get_input_number();
        
        if(this.equals_applied){
            this.record_last_opratator('');
            this.equals_applied = false;
        }
        
        
        this.compute();
        
        this.record_last_opratator(operator);
        this.update_formula(operator);
        this.display_result();
        
        this.operator_applied = true;
    },
    
    
    
    
    add_digit : function(digit){
        if(digit===undefined){
            return;
        }
        
        if(this.equals_applied && !this.operator_applied){
            this.clear();
        }
        

        
        if(this.display.innerHTML === "0" || this.operator_applied){
            if (this.display.innerHTML === "0" && digit===0){
                return;
            }
            this.operator_applied = false;
            this.display.innerHTML =  digit==="."? "0.":digit;
        }else{
            if(this.display.innerHTML.length === (this.minus_sign_switch?13:12)){
                return;
            }
            this.display.innerHTML += digit;
        }
    },
    
    
    plus_minus: function(){
        if(this.minus_sign_switch){
            this.display.innerHTML = this.display.innerHTML.replace("-","");
            this.minus_sign_switch = !this.minus_sign_switch;
        
        }else if(this.display.innerHTML !== "0"){
            this.display.innerHTML = "-"+this.display.innerHTML;
            this.minus_sign_switch = !this.minus_sign_switch;
        }
        
        this.operator_applied = false;
    },
    
    update_minus_sign_switch: function(){
        if(parseFloat(this.display.innerHTML) >= 0){
            this.minus_sign_switch = false;
            
        }else{
            this.minus_sign_switch = true;
        }
    },
    
    backspace: function(){
        if(this.display.innerHTML.length === 0){
            return;
        }
    
        this.display.innerHTML = this.display.innerHTML.substr(0,this.display.innerHTML.length-1);
        if(this.display.innerHTML.length === 0 || this.display.innerHTML === "-"){
            this.display.innerHTML = "0";
        }
        this.operator_applied = false;
        this.update_minus_sign_switch();
    },
    
    add_memory: function(){
        this.memory += parseFloat(this.display.innerHTML);
        this.memory_sign.innerHTML = "M";
    },
    
    minus_memory: function(){
        this.memory -= parseFloat(this.display.innerHTML);
        this.memory_sign.innerHTML = "M";
    },
    
    recover_memory: function(){
        this.display.innerHTML = this.memory.toString();
        this.operator_applied = false;
        this.update_minus_sign_switch();
    },
    
    clear_memory: function(){
        this.memory = 0;
        this.memory_sign.innerHTML = "&nbsp;";
    },
    
    input: function(input){
        if(input === 'C'){
            this.clear();
        }
    
        if(this.error_switch){
            return;
        }
    
        switch(input){
            case 'CE':
                this.clearEntry();
                return;
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case '.': 

                this.add_digit(input);
                return;
            case '+': case '-': case '*': case '/':
                this.add_operator(input);
                return;
            case '±':
                this.plus_minus();
                return;
            case '←':
                this.backspace();
                return;
            case '√':
                this.root();
                return;
            case 'M+':
                this.add_memory();
                return;
            case 'M-':
                this.minus_memory();
                return;
            case 'MR':
                this.recover_memory();
                return;
            case 'MC':
                this.clear_memory();
                return;
            default:
                return;
        }
    }
    
};


