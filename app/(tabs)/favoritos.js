import { Pressable, ScrollView, Text } from "react-native";
import { Link } from "expo-router";
import { HomeIcon } from "../../components/Icons";
import { styled } from "nativewind";
import { Screen } from "../../components/Screen";

const StyledPressable = styled(Pressable);
export default function About() {
  return (
    <Screen>
      <ScrollView>
        {/*
        <Link asChild href="/">
          <StyledPressable className={`active:opacity-50`}>
            <HomeIcon />
          </StyledPressable>
        </Link>
        */}

        <Text className="text-white font-bold mb-8 text-2xl">
          Sobre el proyecto
        </Text>

        <Text className="text-white text-white/90 mb-4 text-sm">
          Este proyecto es una aplicación móvil diseñada para ofrecer a los
          usuarios un acceso fácil y directo a información detallada sobre
          videojuegos. Utilizando los datos de Metacritic, la plataforma líder
          en reseñas y calificaciones de entretenimiento, la aplicación presenta
          un listado actualizado de juegos con sus respectivos puntajes y
          descripciones.
        </Text>

        <Text className="text-white text-white/90 mb-4 text-sm">
          Esto permite a los usuarios tomar decisiones informadas sobre los
          títulos más destacados en el mercado. La app busca ser una herramienta
          para jugadores y aficionados, brindándoles un vistazo rápido a la
          calidad y popularidad de cada juego, todo en un formato intuitivo y
          amigable.
        </Text>
      </ScrollView>
    </Screen>
  );
}
