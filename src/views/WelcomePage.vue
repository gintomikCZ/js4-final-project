<template>
  <h1>welcome :-)</h1>
  <form>
    <t-button label="cancel" btn-type="button" />
    <t-button small-size label="submit" />
  </form>
  <t-accordeon style="margin-top: 50px" title="Já jsem nadpis">
    <template v-slot:content>
      <ul>
        <li>
          <t-button label="edit" smallSize />
          <t-button label="add new" smallSize />
          <t-button label="delete" smallSize />
        </li>
        <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem minus, ab blanditiis vitae aut, eos
          laborum rem omnis vel sit a voluptas inventore sequi amet aliquid deleniti adipisci reiciendis odio!</li>
      </ul>
    </template>
  </t-accordeon>

</template>

<script>
import TButton from '../components/TButton.vue'
import TAccordeon from '../components/TAccordeon.vue'
export default {
  name: 'WelcomePage',
  components: { TButton, TAccordeon }
}

</script>

<style lang="stylus" scoped>
@import '../styles/variables.styl'

ul
  margin: 0
  padding: 0
  display: flex
  flex-direction: column
  list-style-type: none
ul li
  padding: $list-items-padding
ul li:first-child
 display: flex
 justify-content: flex-end
 border-bottom: 1px solid #cdcdcd
 align-items: center
ul li:not(:first-child)
  text-align: justify
</style>