import app from './app';
import config from './config';

async function main() {
  try {
    const server = app.listen(config.port || 5000, () => {
      console.log(`RentNest Server running on port ${config.port || 5000}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

main();
