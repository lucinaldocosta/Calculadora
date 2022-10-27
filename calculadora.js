"use strict";
const buttonKeys = document.querySelectorAll(".numero");
const displayValorAtual = document.querySelector(".display-valor-atual");
const displayValorAnterior = document.querySelector(".display-valor-anterior");
const operador = document.querySelectorAll(".button-action");
const eliminarChar = document.querySelector(".eliminar-char");
const eliminarTudo = document.querySelector(".eliminar-tudo");
const porcentagem = document.querySelector(".porcentagem");
class Calculadora{
    sumar(num1, num2){
        return num1 + num2;
    }
    restar(num1, num2){
        return num1 - num2;
    }
    dividir(num1, num2){
        return num1 / num2;
    }
    multiplicar(num1, num2){
        return num1 * num2;
    }
}
const calculadora = new Calculadora();
class Display{
    constructor(displayValorAnterior, displayValorAtual){
        this.displayValorAtual = displayValorAtual;
        this.displayValorAnterior = displayValorAnterior;
        this.calculador = new Calculadora();
        this.tipoDeOperador = undefined;
        this.valorAtual = "";
        this.valorAnterior = "";
        this.operadores = {
            sumar: "+",
            dividir: "/",
            multiplicar: "x",
            restar: "-",
        }
    }
    eliminarChar(){
        this.valorAtual = this.valorAtual.toString().slice(0,-1);
        this.mostrarValores();
    }
    eliminarTudo(){
        this.valorAtual = "";
        this.valorAnterior = "";
        this.tipoDeOperador = undefined;
        this.mostrarValores();
    }
    porcentagem(){
        this.valorAtual = (this.valorAtual / 100);
        this.mostrarValores();
    }
    computar(tipo){
        this.tipoDeOperador !== "igual" && this.calcular();
        this.tipoDeOperador = tipo;
        this.valorAnterior = this.valorAtual || this.valorAnterior;
        this.valorAtual = "";
        this.mostrarValores();
    }
    addNum(num){
        if(num === "." && this.valorAtual.includes(".")) return
        this.valorAtual = this.valorAtual.toString() + num.toString();
        this.mostrarValores();

    }
    mostrarValores(){
        this.displayValorAtual.textContent = this.valorAtual;
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.operadores[this.tipoDeOperador] || ""}`;
    }
    calcular(){
        const valorAtual = parseFloat(this.valorAtual);
        const valorAnterior = parseFloat(this.valorAnterior);
        
        if(isNaN(valorAtual) || isNaN(valorAnterior)){
            return
        }
        
        this.valorAtual = this.calculador[this.tipoDeOperador](valorAnterior, valorAtual);
    }
}
const display = new Display(displayValorAtual, displayValorAnterior);
buttonKeys.forEach(boton =>{
    boton.addEventListener("click", ()=>{
        display.addNum(boton.innerHTML);
    });
});
operador.forEach(boton =>{
    boton.addEventListener("click", ()=> display.computar(boton.value));
});
eliminarChar.addEventListener("click", ()=> display.eliminarChar());
eliminarTudo.addEventListener("click", ()=> display.eliminarTudo());
porcentagem.addEventListener("click", ()=> display.porcentagem());