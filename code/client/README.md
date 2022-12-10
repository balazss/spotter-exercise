# Spotter Frontend React App

## Details

The frontend app was created using

- MaterialUI
- Styled Components (Emotion)

## To run the app locally:

In the project directory, you can run:

```bash
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You will also see any lint errors in the console.

## To run the app in a container:

In the project directory, run the following command:

1. Build the image

```bash
docker build -t spotter-exercise-frontend . --build-arg NPM_TOKEN=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 --build-arg NODE_ENV=<development>
```

_Note:_ You should specify the environment as either `production` or `development`. \
_Note:_ There is a dependency for the npm registy for FontAwesome Icons used, hence the registry token

2. Run the container

```bash
docker run -p 3000:3000 spotter-exercise-frontend
```

## If you want to deploy the app to AWS, follow this link:

[Infrastrucutre](https://github.com/balazss/spotter-exercise/tree/main/infrastructure/README.md)
