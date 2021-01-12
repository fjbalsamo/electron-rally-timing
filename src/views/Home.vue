<template>
  <b-container>
    <b-row>
      <b-col>
        <b-media>
           <template #aside>
             <h1>
               <b-img fluid rounded thumbnail :src="require('@/assets/colin.jpg')"/>
             </h1>
           </template>
           <h2>Rally Timing</h2>
           <p>times control in rally competitions</p>
           <p class="text-muted">
             <small>
               this is my little tribute to him. The best WRC driver I have ever 
               seen driving through mountains.
             </small>
           </p>
           <p class="text-muted">
             <small><em>for you flying scotsman.-</em></small>
           </p>
        </b-media>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Home',
}
</script>
