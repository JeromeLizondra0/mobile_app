import AsyncStorage from '@react-native-async-storage/async-storage';

class FormDataService {
  private formData: any = {};

  // Save data for a step
  saveStepData = async (step: string, data: any) => {
    this.formData[step] = data;
    await AsyncStorage.setItem('formData', JSON.stringify(this.formData));
  };

  // Get data for a specific step
  getStepData = async (step: string) => {
    const stored = await AsyncStorage.getItem('formData');
    if (stored) {
      this.formData = JSON.parse(stored);
      return this.formData[step];
    }
    return null;
  };

  // Get all data
  getAllData = async () => {
    const stored = await AsyncStorage.getItem('formData');
    return stored ? JSON.parse(stored) : {};
  };

  // Clear all data
  clearData = async () => {
    this.formData = {};
    await AsyncStorage.removeItem('formData');
  };
}

export default new FormDataService();
