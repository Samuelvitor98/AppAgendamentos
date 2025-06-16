import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ClienteForm() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  const salvarCliente = async () => {
    const novoCliente = { nome, telefone };
    const dados = await AsyncStorage.getItem('clientes');
    const clientes = dados ? JSON.parse(dados) : [];
    clientes.push(novoCliente);
    await AsyncStorage.setItem('clientes', JSON.stringify(clientes));
    alert('Cliente cadastrado!');
    setNome('');
    setTelefone('');
  };

  return (
    <View>
      <Text>Nome do Cliente:</Text>
      <TextInput
        placeholder="Digite o nome"
        value={nome}
        onChangeText={setNome}
      />
      <Text>Telefone:</Text>
      <TextInput
        placeholder="Digite o telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />
      <Button title="Salvar Cliente" onPress={salvarCliente} />
    </View>
  );
}
