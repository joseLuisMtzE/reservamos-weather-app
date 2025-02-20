import React, { useState } from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Searchbar } from "react-native-paper";
import { fetchLocations } from "../src/api/locationsApi";
import { Location } from "../src/types/locationTypes";

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const fetchResults = async (searchText: string) => {
    setLoading(true);
    if (!searchText) {
      setResults([]);
      return;
    }
    try {
      const response = await fetchLocations(searchText);
      setResults(response);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text === "") {
      setResults([]);
      return;
    }

    if (debounceTimeout) {
      setLoading(false);

      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      fetchResults(text);
    }, 500);

    setDebounceTimeout(newTimeout);
  };

  const clearSearch = () => {
    setResults([]);
    handleSearch("");
  };

  const SearchItem = ({ item }: { item: Location }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row  p-4 gap-2 items-center border-b border-b-gray-300"
      onPress={() =>
        router.push({
          pathname: "/detailScreen",
          params: {
            lat: item.lat,
            long: item.long,
            display: item.display,
            country: item.country,
            state: item.state,
            city_name: item.city_name,
          },
        })
      }
    >
      <Text className="text-base font-bold " numberOfLines={1}>
        {item.display.toUpperCase()}
      </Text>
      <Text ellipsizeMode="tail">
        {item.city_name}
        {item.state ? `, ${item.state}` : ""}
        {item.country ? `, ${item.country}` : ""}
      </Text>
    </TouchableOpacity>
  );
  return (
    <View className="flex-1 justify-center items-center p-4 bg-white gap-4">
      <Searchbar
        autoFocus
        style={{ backgroundColor: "#f2f2f2" }}
        placeholder="Buscar..."
        value={query}
        onChangeText={handleSearch}
        autoCapitalize="none"
        loading={loading}
        onClearIconPress={clearSearch}
      />

      {loading ? (
        <Text style={{ marginTop: 10 }}>Buscando...</Text>
      ) : (
        <>
          {results.length === 0 ? (
            <Text style={{ marginTop: 10 }}>Sin coincidencias</Text>
          ) : null}
        </>
      )}

      <FlatList
        className="w-full"
        data={results}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: Location }) => (
          <SearchItem item={item} />
        )}
        contentContainerStyle={{
          backgroundColor: "#f2f2f2",
          borderRadius: 16,
        }}
      />
    </View>
  );
}
