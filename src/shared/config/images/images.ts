export const GIFS = {
    UserPanel: {
        local_aqua: '/public/backgrounds/background.gif',
        local_stars: '/public/backgrounds/userpanel-background.gif',
        variants: {
            space: 'https://media1.tenor.com/m/MNVxgsGfaUQAAAAC/in-space-national-space-day.gif',
            beach: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3gwcjN5endlYzFtNTdlZGRxN3J5Y3hkbTQzdXc1dTJkczFobnZpeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/k5GcybwY1yybmGwrFg/giphy.gif',
            gradient:
                'https://i.pinimg.com/originals/4b/dd/08/4bdd083ae4c96a16b63c8bf5e1f2492a.gif',
            purple: 'https://i.pinimg.com/originals/d8/e6/eb/d8e6eb6b345ada088e2448947c483ab4.gif',
        },
    },
} as const;

export const ACTIVE_BACKGROUND = GIFS.UserPanel.local_aqua;
// export const ACTIVE_BACKGROUND = GIFS.UserPanel.variants.beach;
