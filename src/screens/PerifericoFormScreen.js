import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createPeriferico, updatePeriferico, getPerifericoById } from '../services/api';

const PerifericoFormScreen = ({ route, navigation }) => {
  const [nome, setNome] = useState('');
  const { id, computadorId } = route.params;

  useEffect(() => {
    if (id) {
      const fetchPeriferico = async () => {
        try {
          const response = await getPerifericoById(id);
          setNome(response.data.nome);
        } catch (error) {
          Alert.alert("Erro", "Não foi possível carregar o periférico.");
        }
      };
      fetchPeriferico();
    }
  }, [id]);

  const handleSave = async () => {
    if (!nome) {
      Alert.alert("Erro", "O nome é obrigatório.");
      return;
    }
    
    const perifericoData = { nome, computadorId };

    try {
      if (id) {
        await updatePeriferico(id, perifericoData);
      } else {
        await createPeriferico(perifericoData);
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o periférico.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Periférico"
        value={nome}
        onChangeText={setNome}
      />
      <Button title={id ? "Atualizar" : "Salvar"} onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 15, paddingHorizontal: 10 },
});

export default PerifericoFormScreen;