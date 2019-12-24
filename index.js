/*
 <prog> ::= <stmt> ...

 <stmt> ::= label <label> :
         |  goto <label> ;
         |  var <var> := <exp> ;
         |  if <exp> goto <label> ;

 <exp> ::= <exp> + <exp>
        |  <exp> * <exp>
        |  <exp> = <exp>
        |  <int>
        |  <var>
*/

let labels = {};
let variables = {};
let program = [
    new myStmt('label', 'start', 0),
    new myStmt('var', 'counter', new )
];
let programCounter = 0;

const STATEMENT_LABEL = 'label';   //new myStmt('label', <name>, <Line Number>)
const STATEMENT_GOTO = 'goto'; //new myStmt('goto', <label>)
const STATEMENT_VAR = 'var'; // new myStmt('var', <name>)
const STATEMENT_IF = 'if'; // new myStmt('if',<exp>, <stmt if true>, <stmt else>)

function myStmt(Cmd, a, b=0) {
    this.cmd = cmd;
    this.a = a;
    this.b = b;

    if(cmd == STATEMENT_LABEL) labels[a] = b;
    if(cmd == STATEMENT_VAR) variables[a] = this;

    this.evaluate = () => {
        let return_value;
        programCounter++;

        switch(this.cmd) {
            case STATEMENT_LABEL: return_value = null;
                break;
            case STATEMENT_VAR: return_value = b.evaluate();
                break;
            case STATEMENT_IF: if(a.evaluate()) programCounter = labels[a].b;
                    return_value = null;
                break; 
            case STATEMENT_GOTO: programCounter = labels[a].b;
                    return_value= null;
                break;
        }

        return return_value;
    }
}

const OPERATOR_EQUAL = '=';
const OPERATOR_PLUS = '+';
const OPERATOR_TIMES = '*';
const OPERATOR_INT = 'int';
const OPERATOR_VAR = 'var';

function myExp(Op, a, b=0)
{
    this.Operator = Op;
    this.a = a;
    this.b = b;

    this.evaluate = () => {
        let return_value;
        switch(this.Operator) {
            case OPERATOR_INT: 
                return_value = a;
                break;
            case OPERATOR_VAR:
                return_value = variables[a].evaluate();
                break;
            case OPERATOR_PLUS: return_value = a.evaluate() + b.evaluate();
                break;
            case OPERATOR_TIMES: return_value = a.evaluate() * b.evaluate();
                break;
            case OPERATOR_EQUAL: return_value = (a.evaluate() == b.evaluate());
                break;
        }

        return return_value;

    }
}

let trialExpress = new myExp('+', new myExp('int', 5), new myExp('*', new myExp('int', 6), new myExp('int', 6)));

console.log(trialExpress.evaluate());


