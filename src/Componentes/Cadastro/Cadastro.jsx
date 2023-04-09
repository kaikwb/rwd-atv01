import React, {useCallback, useEffect} from "react";
import {useForm} from "react-hook-form";
import InputMask from "react-input-mask";
import styled from "styled-components";
import axios from "axios";
import "@fontsource/roboto";

const PageTitle = styled.p`
  font-family: Roboto, sans-serif;
  font-size: 36px;
  text-align: center;
  margin: 10px;
`;

const FormStyled = styled.form`
  margin: 10px auto;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  font-family: Roboto, sans-serif;
  max-width: 800px;
  padding: 0 20px;

  div {
    width: fill-available;
  }

  div > * {
    width: inherit;
  }
`;

const styleInput = `
  grid-column: 2;
  background-color: white;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid gray;
  font-family: Roboto, sans-serif;
`;

const LabelStyled = styled.label`
  grid-column: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
`;

const InputStyled = styled.input`
  ${styleInput}
`;

const InputMaskStyled = styled(InputMask)`
  ${styleInput}
`;

const InvalidField = styled.p`
  color: red;
  grid-column: 2;
  background-color: #fce6e6;
  padding: 8px;
  border-radius: 4px;
`;

const ButtonStyled = styled.input`
  margin: 10px auto;
  grid-column: span 2;

  background-color: #1976d2;
  border: none;
  border-radius: 4px;
  color: white;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  padding: 12px;
  cursor: pointer;

  &:hover {
    background-color: #135ba1;
  }
`;

function ufToEstado(uf) {
    const estados = {
        "AC": "Acre",
        "AL": "Alagoas",
        "AP": "Amapá",
        "AM": "Amazonas",
        "BA": "Bahia",
        "CE": "Ceará",
        "DF": "Distrito Federal",
        "ES": "Espírito Santo",
        "GO": "Goiás",
        "MA": "Maranhão",
        "MT": "Mato Grosso",
        "MS": "Mato Grosso do Sul",
        "MG": "Minas Gerais",
        "PA": "Pará",
        "PB": "Paraíba",
        "PR": "Paraná",
        "PE": "Pernambuco",
        "PI": "Piauí",
        "RJ": "Rio de Janeiro",
        "RN": "Rio Grande do Norte",
        "RS": "Rio Grande do Sul",
        "RO": "Rondônia",
        "RR": "Roraima",
        "SC": "Santa Catarina",
        "SP": "São Paulo",
        "SE": "Sergipe",
        "TO": "Tocantins"
    };

    return estados[uf.toUpperCase()] || "";
}

export default function Cadastro() {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        getFieldState,
        resetField,
        formState: {errors}
    } = useForm({mode: "all"});
    const cepState = getFieldState("cep");

    const onSubmit = (data) => {
        axios.post("/cadastrar", data).then((respose) => {
            alert("Usuário cadastrado com sucesso!");
        }).catch((error) => {
            console.log(error);
            alert("Um erro ocorreu ao cadastrar o usuário, por for tente novamente.");
        });
    };

    const fillCepData = useCallback((data) => {
        if (data) {
            setValue("logradouro", data.logradouro);
            setValue("bairro", data.bairro);
            setValue("cidade", data.localidade);
            setValue("estado", ufToEstado(data.uf));
        } else {
            resetField("logradouro");
            resetField("bairro");
            resetField("cidade");
            resetField("estado");
        }
    }, [resetField, setValue]);

    useEffect(() => {
        if (!cepState.invalid && cepState.isDirty) {
            const cepValue = getValues("cep").replace(/\D/g, "");
            axios.get("https://viacep.com.br/ws/" + cepValue + "/json").then((response) => {
                const data = response.data;

                if (data?.erro) {
                    fillCepData(null);
                    alert("CEP informado é inválido, por favor verifique ao CEP informado");
                } else {
                    fillCepData(data);
                }
            }).catch((error) => {
                alert("Não foi possível buscar o CEP informado, por favor tente novamente.");
            });
        } else {
            fillCepData(null);
        }
    }, [cepState.invalid, cepState.isDirty, fillCepData, getValues]);

    return (
        <>
            <PageTitle>Cadastrar</PageTitle>
            <FormStyled onSubmit={handleSubmit(onSubmit)} method="POST" action="/">
                <LabelStyled htmlFor="name">Nome:</LabelStyled>
                <div>
                    <InputStyled type="text" id="name" {...register("name", {
                        required: {
                            value: true,
                            message: "Este campo é obrigatório"
                        }
                    })} />
                    {errors.name && <InvalidField>{errors.name.message}</InvalidField>}
                </div>

                <LabelStyled htmlFor="cpf">CPF:</LabelStyled>
                <div>
                    <InputMaskStyled mask="999.999.999-99" type="text" id="cpf" {...register("cpf", {
                        required: {
                            value: true,
                            message: "Este campo é obrigatório"
                        },
                        pattern: {
                            value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/i,
                            message: "Por favor, insira um CPF válido"
                        }
                    })} />
                    {errors.cpf && <InvalidField>{errors.cpf.message}</InvalidField>}
                </div>

                <LabelStyled htmlFor="motherName">Nome da mãe:</LabelStyled>
                <div>
                    <InputStyled type="text" id="motherName" {...register("motherName", {
                        required: {
                            value: true,
                            message: "Este campo é obrigatório"
                        }
                    })} />
                    {errors.motherName && <InvalidField>{errors.motherName.message}</InvalidField>}
                </div>

                <LabelStyled htmlFor="cep">CEP:</LabelStyled>
                <div>
                    <InputMaskStyled mask="99999-999" type="text" id="cep" {...register("cep", {
                        required: {
                            value: true,
                            message: "Este campo é obrigatório"
                        },
                        pattern: {
                            value: /^\d{5}-\d{3}$/i,
                            message: "Por favor, insira um CEP válido"
                        }
                    })} />
                    {errors.cep && <InvalidField>{errors.cep.message}</InvalidField>}
                </div>

                <LabelStyled htmlFor="logradouro">Logradouro:</LabelStyled>
                <InputStyled type="text" id="logradouro" {...register("logradouro", {})} disabled/>

                <LabelStyled htmlFor="numero">Número:</LabelStyled>
                <InputStyled type="text" id="numero" {...register("numero", {})} />

                <LabelStyled htmlFor="complemento">Complemento:</LabelStyled>
                <InputStyled type="text" id="complemento" {...register("complemento", {})} />

                <LabelStyled htmlFor="bairro">Bairro:</LabelStyled>
                <InputStyled type="text" id="bairro" {...register("bairro", {})} disabled/>

                <LabelStyled htmlFor="cidade">Cidade:</LabelStyled>
                <InputStyled type="text" id="cidade" {...register("cidade", {})} disabled/>

                <LabelStyled htmlFor="estado">Estado:</LabelStyled>
                <InputStyled type="text" id="estado" {...register("estado", {})} disabled/>

                <ButtonStyled type="submit" value="Cadastrar"/>
            </FormStyled>
        </>
    );
}
