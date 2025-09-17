import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createComputador, updateComputador, getComputadorById } from '../services/api';

const ComputadorFormScreen = ({ route, navigation }) => {
  const [nome, setNome] = useState('');
  const [cor, setCor] = useState('');
  const [dataFabricacao, setDataFabricacao] = useState('');

  const id = route.params?.id;

  useEffect(() => {
    if (id) {
      const fetchComputador = async () => {
        try {
          const response = await getComputadorById(id);
          const computador = response.data;
          setNome(computador.nome);
          setCor(computador.cor);
          setDataFabricacao(computador.dataFabricacao.toString());
        } catch (error) {
          console.error("Erro ao buscar computador:", error);
          Alert.alert("Erro", "Não foi possível carregar os dados para edição.");
        }
      };
      fetchComputador();
    }
  }, [id]);

  const handleSave = async () => {
    if (!nome || !cor || !dataFabricacao) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    const computadorData = {
      nome,
      cor,
      dataFabricacao: parseInt(dataFabricacao, 10),
    };

    try {
      if (id) {
        await updateComputador(id, computadorData);
        Alert.alert("Sucesso", "Computador atualizado!");
      } else {
        await createComputador(computadorData);
        Alert.alert("Sucesso", "Computador criado!");
      }
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      Alert.alert("Erro", "Não foi possível salvar os dados.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Computador"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Cor"
        value={cor}
        onChangeText={setCor}
      />
      <TextInput
        style={styles.input}
        placeholder="Ano de Fabricação"
        value={dataFabricacao}
        onChangeText={setDataFabricacao}
        keyboardType="numeric"
      />
      <Button title={id ? "Atualizar" : "Salvar"} onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 15, paddingHorizontal: 10 },
});

export default ComputadorFormScreen;
