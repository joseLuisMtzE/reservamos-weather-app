// app/searchScreen.tsx
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // Link para regresar
import { Searchbar } from "react-native-paper";
import axios from "axios";

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [xdTimeout, setXdTimeout] = useState<NodeJS.Timeout | null>(null);

  const fetchResults = async (searchText: string) => {
    // if (debounceTimeout) {
    //   clearTimeout(xdTimeout);
    // }
    setLoading(true);
    if (!searchText) {
      setResults([]);
      return;
    }
    console.log(searchText);
    // setXdTimeout(
    //   setTimeout(() => {
    //     setLoading(false);
    //   }, 4000)
    // );

    try {
      const response = await axios.get(
        `https://search.reservamos.mx/api/v2/places?q=${searchText}`
      );
      setResults(response.data); // Ajusta esto según la respuesta de tu API
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  // Manejador del cambio en el input con debounce manual
  const handleSearch = (text: string) => {
    setQuery(text);
    if (text === "") return;

    // Limpiar el timeout anterior
    if (debounceTimeout) {
      setLoading(false);

      clearTimeout(debounceTimeout);
    }

    // Crear un nuevo timeout para ejecutar la búsqueda después de 500ms
    const newTimeout = setTimeout(() => {
      fetchResults(text);
    }, 500);

    setDebounceTimeout(newTimeout);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* <View style={{ flex: 1, padding: 16 }}> */}
      <Searchbar
        placeholder="Buscar..."
        value={query}
        onChangeText={handleSearch}
        autoCapitalize="none"
        loading={loading}
      />

      {loading && <Text style={{ marginTop: 10 }}>Buscando...</Text>}

      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            className="flex-row p-4 gap-2 items-center"
            onPress={() => console.log(item, item.lat, item.long)}
          >
            <Text className="text-lg font-bold">{item.display}</Text>
            <Text>{item.city_name}</Text>
            <Text>{item.state}</Text>
            <Text>{item.country}</Text>
          </TouchableOpacity>
        )}
      />
      {/* </View> */}
    </View>
  );
}
