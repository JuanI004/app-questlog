Readme · MD
# ⚔️ QuestLog

> Transformá el estudio en una aventura. Subí de nivel, desbloqueá habilidades y conquistá tus metas académicas.

---

## 📖 ¿Qué es QuestLog?

QuestLog es una aplicación web gamificada para estudiantes. La idea es simple: cada sesión de estudio es una misión, cada materia es un desafío, y cada día que estudiás suma a tu racha. A medida que progresás, subís de nivel, desbloqueás títulos y ganás monedas para gastar en la tienda.

---

## 🛠️ Stack tecnológico

| Tecnología | Uso |
|---|---|
| **Next.js 14** (App Router) | Framework principal |
| **Tailwind CSS** | Estilos |
| **Supabase** | Auth, base de datos y storage |

---

## 🗂️ Estructura del proyecto

```
app/
├── page.js                     # Landing page
├── iniciar-sesion/page.js      # Login
├── crear-cuenta/
│   ├── page.js                 # Registro
│   └── personaje/page.js       # Onboarding (avatar + arquetipo)
├── dashboard/page.js           # Dashboard principal
└── perfil/page.js              # Perfil del jugador

public/
├── nivel-icon.svg
├── xp-icon.svg
├── racha-icon.svg
├── monedas-icon.svg
└── ...assets
```

---

## 🗄️ Base de datos (Supabase)

### Tabla `player`

| Campo | Tipo | Descripción |
|---|---|---|
| `user_id` | uuid | FK → auth.users (unique, cascade) |
| `username` | text | Nombre del jugador |
| `nivel` | int | Calculado automáticamente por trigger |
| `xp` | int | Experiencia total acumulada |
| `racha_dias` | int | Días consecutivos de estudio |
| `arquetipo` | text | Caballero del Saber / Mago del Conocimiento / Elfo Explorador |
| `monedas` | int | Moneda in-game |
| `image_url` | text | URL del avatar en Storage |
| `nuevo` | bool | `true` si no completó el onboarding |

**Tabla de niveles de referencia:**

| XP | Nivel |
|---|---|
| 0 | 1 |
| 50 | 2 |
| 200 | 3 |
| 450 | 4 |
| 800 | 5 |

---

## 🧙 Arquetipos

| Arquetipo | Especialidad |
|---|---|
| ⚔️ Caballero del Saber | Disciplina, bonus por rachas |
| 🔮 Mago del Conocimiento | Concentración, sesiones largas |
| 🌿 Elfo Explorador | Velocidad, variedad de materias |

---

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/questlog.git
cd questlog

# Instalar dependencias
npm install

# Correr en desarrollo
npm run dev
```

## 🗺️ Roadmap

- [x] Auth (registro, login, logout)
- [x] Onboarding (avatar, username, arquetipo)
- [x] Página de perfil con stats y títulos
- [x] Dashboard con sesiones de estudio
- [ ] Guardar sesiones en la base de datos
- [ ] XP y monedas al finalizar sesión
- [ ] Árbol de habilidades
- [ ] Tienda de cosméticos
- [ ] Rankings / leaderboard

---

*QuestLog © 2025*
