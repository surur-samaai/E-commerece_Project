<template>
  <div id="body">
  <div class="container">
    <h1>Book Your Class</h1>
    <p class="subtitle">Choose from our wide range of fitness classes</p>

    <div class="booking-wrapper">
      <!-- Filters Section -->
      <div class="filters">
        <h2>Filters</h2>
        <label for="date">Date</label>
        <input type="date" id="date" v-model="date" />

        <label for="classType">Class Type</label>
        <select id="classType" v-model="classType">
          <option value="all">All Classes</option>
          <option value="hiit">HIIT Workout</option>
          <option value="yoga">Yoga Flow</option>
          <option value="strength">Strength Training</option>
        </select>

        <label for="trainer">Trainer</label>
        <select id="trainer" v-model="trainer">
          <option value="any">Any Trainer</option>
          <option value="john">John Smith</option>
          <option value="sarah">Sarah Johnson</option>
          <option value="mike">Mike Wilson</option>
        </select>

        <label for="time">Time</label>
        <select id="time" v-model="time">
          <option value="any">Any Time</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </select>
      </div>

      <!-- Class List -->
      <div class="class-list">
        <div class="class-card" v-for="classInfo in filteredClasses" :key="classInfo.id">
          <div class="class-info">
            <h3>{{ classInfo.name }}</h3>
            <p class="trainer">with {{ classInfo.trainer }}</p>
            <p class="spots">👥 {{ classInfo.spots }} spots left</p>
          </div>
          <div class="class-time">
            <p class="time">{{ classInfo.time }}</p>
            <p class="duration">{{ classInfo.duration }} mins</p>
            <button class="book-btn" @click="bookClass(classInfo)">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name:"BookingView",
  data() {
    return {
      date: "",
      classType: "all",
      trainer: "any",
      time: "any",
      classes: [
        {
          id: 1,
          name: "HIIT Workout",
          trainer: "John Smith",
          spots: 12,
          time: "09:00 AM",
          duration: 45,
          type: "hiit",
        },
        {
          id: 2,
          name: "Yoga Flow",
          trainer: "Sarah Johnson",
          spots: 8,
          time: "10:30 AM",
          duration: 60,
          type: "yoga",
        },
        {
          id: 3,
          name: "Strength Training",
          trainer: "Mike Wilson",
          spots: 5,
          time: "02:00 PM",
          duration: 50,
          type: "strength",
        },
      ],
    };
  },
  computed: {
    filteredClasses() {
      return this.classes.filter((classInfo) => {
        if (this.classType === "all" && this.trainer === "any" && this.time === "any") {
          return true;
        }

        if (this.classType !== "all" && classInfo.type !== this.classType) {
          return false;
        }

        if (this.trainer !== "any" && classInfo.trainer !== this.trainer) {
          return false;
        }

        if (this.time !== "any" && !this.getTimeRange(classInfo.time).includes(this.time)) {
          return false;
        }

        return true;
      });
    },
  },
  methods: {
    bookClass(classInfo) {
      console.log(`Booking class: ${classInfo.name} with ${classInfo.trainer}`);
    },
    getTimeRange(time) {
      const timeParts = time.split(" ");
      const hour = parseInt(timeParts[0].split(":")[0]);
      const period = timeParts[1];

      if (period === "AM") {
        if (hour < 12) {
          return ["morning"];
        } else {
          return ["afternoon"];
        }
      } else {
        if (hour < 18) {
          return ["afternoon"];
        } else {
          return ["evening"];
        }
      }
    },
  },
};
</script>

<style scoped>
#body {
  font-family: Arial, sans-serif;
  background-color: #333;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.container {
  width: 90%;
  max-width: 1000px;
  background: white;
  padding: 30px;
  margin-top: 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(255, 0, 0, 0.2);
}

h1 {
  text-align: left;
  color: #d32f2f;
}

.subtitle {
  text-align: left;
  color: #555;
  margin-bottom: 20px;
}

.booking-wrapper {
  display: flex;
  gap: 20px;
}

.filters {
  background: white;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #d32f2f;
  height: fit-content;
  width: 30%;
  box-shadow: 0px 2px 10px rgba(255, 0, 0, 0.2);
}

.filters h2 {
  margin-bottom: 15px;
  text-align: left;
}

.filters label {
  display: block;
  font-size: 14px;
  margin-top: 10px;
  font-weight: bold;
  color: #333;
}

.filters input,
.filters select {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #d32f2f;
  margin-top: 5px;
  font-weight: bold;
  background: white;
  color: #d32f2f;
  transition: border-color 0.3s, background 0.3s;
}

.filters input[type="date"] {
  background: white;
  color: #d32f2f;
  font-weight: bold;
  border: 1px solid #d32f2f;
  margin-top: 5px;
  padding: 10px;
  width: 92%;
  transition: border-color 0.3s, background 0.3s;
}

.filters input:focus,
.filters select:focus {
  border-color: crimson;
  outline: none;
}

.class-list {
  flex: 1;
}

.class-card {
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #d32f2f;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(255, 0, 0, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;
}

.class-card:hover {
  transform: translateY(-2px);
  box-shadow: 0px 4px 15px rgba(255, 0, 0, 0.4);
}

.class-card h3 {
  color: #d32f2f;
}

.class-info h3 {
  margin: 0;
  font-size: 18px;
  color: black;
}

.trainer {
  font-size: 14px;
  color: #555;
}

.spots {
  font-size: 14px;
  color: #888;
}

.class-time {
  text-align: right;
}

.class-time .time {
  font-weight: bold;
  font-size: 16px;
  color: #d32f2f;
}

.class-time .duration {
  font-size: 14px;
  color: #666;
}

.book-btn {
  background: #d32f2f;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 5px;
  transition: background 0.3s;
}

.book-btn:hover {
  background: #a50e0e;
}
</style>